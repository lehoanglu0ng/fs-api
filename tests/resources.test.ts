import Joi from 'joi';

Feature('RESOURCES');

const UNKNOWNN = '/unknown'

Scenario('[GET] LIST <RESOURCE>', ({ I }) => {
    const schema = Joi.object().keys(
        {
            page: Joi.number().required(),
            per_page: Joi.number().required(),
            total: Joi.number().required(),
            total_pages: Joi.number().required(),
            data: Joi.array().items(Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string().required(),
                year: Joi.number().required(),
                color: Joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
                pantone_value: Joi.string().regex(/^\d{2}-\d{4}$/).required(),
            }).min(0)),
            support: {
                url: Joi.string().uri().required(),
                text: Joi.string().required(),
            }
        });
    I.sendGetRequest(UNKNOWNN);
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseValidByCallback(({ data, status, expect }) => {
        expect(data.page).to.eql(1);
        expect(data.per_page).to.eql(6);
        expect(data.total).to.eql(12);
        expect(data.total_pages).to.eql(2);
    });
});

Scenario('[GET] SINGLE <RESOURCE>', ({ I }) => {
    const schema = Joi.object().keys(
        {
            data: {
                id: Joi.number().required(),
                name: Joi.string().required(),
                year: Joi.number().required(),
                color: Joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required(),
                pantone_value: Joi.string().regex(/^\d{2}-\d{4}$/).required(),
            },
            support: {
                url: Joi.string().uri().required(),
                text: Joi.string().required(),
            }
        });

    I.sendGetRequest(`${UNKNOWNN}/2`);
    I.seeResponseCodeIs(200);
    I.seeResponseMatchesJsonSchema(schema);
    I.seeResponseEquals({
        "data": {
            "id": 2,
            "name": "fuchsia rose",
            "year": 2001,
            "color": "#C74375",
            "pantone_value": "17-2031"
        },
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    });
});

Scenario('[GET] SINGLE <RESOURCE> NOT FOUND', ({ I }) => {
    I.sendGetRequest(`${UNKNOWNN}/23`);
    I.seeResponseCodeIs(404);
    I.seeResponseEquals({})
});