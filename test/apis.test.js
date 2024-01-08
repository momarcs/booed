const profileOperations = require('../routes/profile');
const request = require('supertest');
const app = require('../app');

describe("Users Operations", () => {
    test('Get all Users', async () => {
        const res = await request(app)
            .get('/users')
            .expect(200)

        expect(res.statusCode).toEqual(200);

        expect(res.body.data).toBeDefined()
        expect(res.body.data.records[0]._id).toBeDefined()
        expect(res.body.data.records[0].name).toBeDefined()
    })

    test('Get User Profile', async () => {
        const res = await request(app)
            .get('/profile/65995c61b4557da675133bcd')
            .expect(200)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined()
        expect(res.body.data.profile._id).toBeDefined()
        expect(res.body.data.profile.name).toBeDefined()
        expect(res.body.data.profile.description).toBeDefined()
        expect(res.body.data.profile.image).toBeDefined()
    })

    test('Create Profile', async () => {
        const res = await request(app)
            .post('/profile')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                name: "Gol D Roger",
                description: "Hola, I am good !",
                mbti: "ESTP",
                enneagram: "4w2",
                variant: "dsp",
                tritype: 250,
                socionics: "SAWW",
                sloan: "OGGY",
                psyche: "HYPER",
                temperaments: "pressures",
                image: "https://soulverse.boo.world/images/1.png"
            })
            .expect(200)
    })

    test('Get all Comments By Profile', async () => {
        const res = await request(app)
            .get('/comments')
            .send({
                profile_id: "65997433629c8d6e407063f8"
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined()
    })

    test('Get Profile Comments By Best Sort (DESC)', async () => {
        const res = await request(app)
            .get('/comments')
            .send({
                profile_id: "65995c61b4557da675133bcd",
                sort_by: "likes",
                sort_order: -1
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined()
    })

    test('Get Profile Comments By RECENT Sort', async () => {
        const res = await request(app)
            .get('/comments')
            .send({
                profile_id: "65995c61b4557da675133bcd",
                sort_by: "created_at",
                sort_order: -1
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined()
    })

    test('Get Profile Comments By Personality Filter (zodiac)', async () => {
        const res = await request(app)
            .get('/comments')
            .send({
                profile_id: "65995c61b4557da675133bcd",
                type: "zodiac"
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined()
    })

    test('Add a comment against Profile Id', async () => {
        const res = await request(app)
            .post('/comment')
            .send({
                profile_id: "65995c61b4557da675133bcd",
                comment: "Adding test comment !",
                personality_types: [
                    {
                        "type": "mbti",
                        "value": "infp"
                    },
                    {
                        "type": "enneagram",
                        "value": "6w4"
                    },
                    {
                        "type": "zodiac",
                        "value": "pices"
                    }
                ],
                likes: 0
            })
            .expect(200)
    })

    test('Like Comment', async () => {
        const res = await request(app)
            .get('/like')
            .send({
                comment_id: "659984b2c5650e35e4462bf6"
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
    })

    test('Unlike Comment', async () => {
        const res = await request(app)
            .get('/unlike')
            .send({
                comment_id: "659984b2c5650e35e4462bf6"
            })
            .expect(200)

        expect(res.statusCode).toEqual(200);
    })
});