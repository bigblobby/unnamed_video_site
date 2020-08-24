import Api from '../../services/ApiService';

describe("Api tests", () => {
    test("set and get cache", () => {
        const data = { data: { prop: 'some data' } };
        const result = Api.getCached('key', () => {
            return data;
        });

        expect(result).toEqual(data);
    });
});
