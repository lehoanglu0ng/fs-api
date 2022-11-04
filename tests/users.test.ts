import Joi from 'joi';

Feature('USERS');

const USER = '/users'

Scenario('[POST] CREATE', ({ I }) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        job: Joi.string().required(),
        id: Joi.number().required(),
        createdAt: Joi.date().required(),
    });

    I.sendPostRequest(USER, {
        "name": "morpheus",
        "job": "leader"
    });
    I.seeResponseCodeIs(201);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data.name).to.eql('morpheus');
        expect(data.job).to.eql('leader');
    });
});

Scenario('[PUT] UPDATE', ({ I }) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        job: Joi.string().required(),
        updatedAt: Joi.date().required(),
    });

    I.sendPutRequest(`${USER}/2`, {
        "name": "morpheus",
        "job": "zion resident"
    });
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data.name).to.eql('morpheus');
        expect(data.job).to.eql('zion resident');
    });
});

Scenario('[PATCH] UPDATE', ({ I }) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        job: Joi.string().required(),
        updatedAt: Joi.date().required(),
    });

    I.sendPatchRequest(`${USER}/2`, {
        "name": "morpheus",
        "job": "zion resident"
    });
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data.name).to.eql('morpheus');
        expect(data.job).to.eql('zion resident');
    });
});

Scenario('[DELETE] DELETE', ({ I }) => {
    I.sendDeleteRequest(`${USER}/2`);
    I.seeResponseCodeIs(204);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data).to.be.empty;
    });
});

Scenario('[GET] SINGLE USER', ({ I }) => {
    const schema = Joi.object().keys(
        {
            data: {
                id: Joi.number().required(),
                email: Joi.string().email().required(),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                avatar: Joi.string().uri(),
            },
            support: {
                url: Joi.string().uri().required(),
                text: Joi.string().required(),
            }
        });

    I.sendGetRequest(`${USER}/2`);
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseEquals({
        "data": {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    });
});

Scenario('[GET] LIST USERS', ({ I }) => {
    const schema = Joi.object().keys(
        {
            page: Joi.number().required(),
            per_page: Joi.number().required(),
            total: Joi.number().required(),
            total_pages: Joi.number().required(),
            data: Joi.array().items(Joi.object().keys({
                id: Joi.number().required(),
                email: Joi.string().email().required(),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                avatar: Joi.string().uri().required(),
            }).min(0)),
            support: {
                url: Joi.string().uri().required(),
                text: Joi.string().required(),
            }
        });

    I.sendGetRequest(`${USER}?page=2`);
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data.page).to.eql(2);
        expect(data.per_page).to.eql(6);
        expect(data.total).to.eql(12);
        expect(data.total_pages).to.eql(2);
    });
});

Scenario('[GET] SINGLE USER NOT FOUND', ({ I }) => {
    I.sendGetRequest(`${USER}/23`);
    I.seeResponseCodeIs(404);
    I.seeResponseEquals({});
});