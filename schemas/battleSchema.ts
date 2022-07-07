import joi from "joi";

export const battleSchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required(),
});