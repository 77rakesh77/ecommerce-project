const Joi = require("joi");

const validateInput = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: errorMessage });
        }

        next();
    };
};

const registerUserSchema = Joi.object({
    userName: Joi.string()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .required(),
    gender: Joi.any()
        .optional(),
    mobile: Joi.any()
        .optional()
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

//admin validation schema

const registerAdminSchema = Joi.object({
    userName: Joi.string()
        .required(),
    name: Joi.string()
        .required(),
    adminName: Joi.string()
        .required(),
    productName: Joi.string()
        .required(),
    price: Joi.number()
        .required(),
    category: Joi.string()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .required(),
    mobile: Joi.any()
        .optional()
});

const loginAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

//saller validation schema

const sallerRagisterSchema = Joi.object({
    sallerCode: Joi.string().required(),
    sallerName: Joi.string().required(),
    sallerEmail: Joi.string().required(),
    productName: Joi.string().required(),
    category: Joi.string().required(),
    address: Joi.string().required(),
    mobile: Joi.string().required(),
    price: Joi.number().required()
});

const sallerLoginSchema = Joi.object({
    sallerCode: Joi.string().required(),
    sallerName: Joi.string().required(),
    sallerEmail: Joi.string().required()
})

module.exports = {
    registerUserSchemaInput: validateInput(registerUserSchema),
    validateLoginInput: validateInput(loginUserSchema),
    registerAdminImput: validateInput(registerAdminSchema),
    adminLoginInput: validateInput(loginAdminSchema),
    sallerRagisterInput: validateInput(sallerRagisterSchema),
    sallerLoginInput: validateInput(sallerLoginSchema)
}