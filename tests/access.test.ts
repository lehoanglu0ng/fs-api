import Joi from 'joi';

Feature('ACCESS');

const REGISTER = '/register'
const LOGIN = '/login'

Scenario('[POST] REGISTER - SUCCESSFUL', ({ I }) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        token: Joi.string().alphanum().length(17).required(),
    });

    I.sendPostRequest(REGISTER, {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    });
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
});

Scenario('[POST] REGISTER - UNSUCCESSFUL', ({ I }) => {
    I.sendPostRequest(REGISTER, {
        "email": "sydney@fife"
    });
    I.seeResponseCodeIs(400);
    I.seeResponseEquals({
        "error": "Missing password"
    });
});

Scenario('[POST] LOGIN - SUCCESSFUL', ({ I }) => {
    const schema = Joi.object().keys({
        token: Joi.string().alphanum().length(17).required(),
    });

    I.sendPostRequest(LOGIN, {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    });
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
});

Scenario('[POST] LOGIN - UNSUCCESSFUL', ({ I }) => {
    const schema = Joi.object().keys({
        token: Joi.string().alphanum().length(17).required(),
    });

    I.sendPostRequest(LOGIN, {
        "email": "peter@klaven"
    });
    I.seeResponseCodeIs(400);
    I.seeResponseEquals({
        "error": "Missing password"
    });
});