const yup = require("yup");
const debug = require("debug")("app:dev");

const userSchemaValidation = async (req, res, next) => {
  const validate = await validateUserSchema(req.body);
  debug("User Schema is Valid: ", validate);

  if (!validate) {
    res.status(400).send({
      error: "Please fill all fields correctly."
    });
  } else {
    next();
  }
};

const validateUserSchema = async user => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .max(10)
      .required(),
    bio: yup
      .string()
      .max(150)
      .required()
  });

  try {
    const response = await schema.isValid(user);
    return response;
  } catch (error) {
    debug("Error: ", error.message);
  }
};

module.exports = userSchemaValidation;
