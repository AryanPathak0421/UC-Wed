const Vendor = require('./Vendor');
const jwt = require('jsonwebtoken');

// @desc    Register vendor
// @route   POST /api/vendor/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { fullName, businessName, email, phone, city, category, password } = req.body;

        // Check if vendor exists
        const vendorExists = await Vendor.findOne({ $or: [{ email }, { phone }] });

        if (vendorExists) {
            return res.status(400).json({
                success: false,
                message: 'Vendor with this email or phone already exists'
            });
        }

        // Create vendor
        const vendor = await Vendor.create({
            fullName,
            businessName,
            email,
            phone,
            city,
            category,
            password
        });

        sendTokenResponse(vendor, 201, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Login vendor
// @route   POST /api/vendor/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        // Check for vendor
        const vendor = await Vendor.findOne({ email }).select('+password');

        if (!vendor) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await vendor.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        sendTokenResponse(vendor, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Update onboarding details
// @route   PUT /api/vendor/onboarding/:step
// @access  Private
exports.updateOnboarding = async (req, res, next) => {
    try {
        const { step } = req.params;
        const vendorId = req.vendor.id;

        let updateData = {};
        let nextStep = '';

        switch (step) {
            case 'business':
                updateData.businessDetails = req.body;
                nextStep = 'services';
                break;
            case 'services':
                updateData.services = req.body;
                nextStep = 'pricing';
                break;
            case 'pricing':
                updateData.pricing = req.body;
                nextStep = 'portfolio';
                break;
            case 'portfolio':
                updateData.portfolio = req.body;
                nextStep = 'documents';
                break;
            case 'documents':
                updateData.documents = req.body;
                nextStep = 'bank';
                break;
            case 'bank':
                updateData.bank = req.body;
                nextStep = 'completed';
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid onboarding step'
                });
        }

        updateData.onboardingStep = nextStep;

        const vendor = await Vendor.findByIdAndUpdate(vendorId, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in vendor
// @route   GET /api/vendor/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const vendor = await Vendor.findById(req.vendor.id);

        res.status(200).json({
            success: true,
            data: vendor
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Upload media to Cloudinary
// @route   POST /api/vendor/upload
// @access  Private
exports.uploadMedia = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        res.status(200).json({
            success: true,
            url: req.file.path, // Cloudinary URL
            public_id: req.file.filename
        });
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (vendor, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });

    const options = {
        expires: new Date(
            Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .json({
            success: true,
            token,
            vendor: {
                id: vendor._id,
                fullName: vendor.fullName,
                businessName: vendor.businessName,
                email: vendor.email,
                onboardingStep: vendor.onboardingStep
            }
        });
};
