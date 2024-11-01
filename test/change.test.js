import request from "supertest";
import app from "../index.js";

const server = app.listen(8787); // Random number is needed to avoid using same port in different tests if run in parallel

afterAll(() => {
  server.close();
});

describe("POST /calculate-change", () => {
  it("should return success and the correct change data for valid bill and owed", async () => {
    const res = await request(app)
      .post("/calculate-change")
      .send({ bill: 1000, owed: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("API executed successfully");
    expect(res.body.data.change).toEqual({
      1: 4,
      5: 1,
      10: 0,
      20: 2,
      50: 1,
      100: 4,
      500: 1,
      1000: 0,
    });
  });

  it("should return success and the correct change data for valid bill and owed", async () => {
    const res = await request(app)
      .post("/calculate-change")
      .send({ bill: 100, owed: 27 });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("API executed successfully");
    expect(res.body.data.change).toEqual({
      1: 3,
      5: 0,
      10: 0,
      20: 1,
      50: 1,
      100: 0,
      500: 0,
      1000: 0,
    });
  });

  it("should return error if bill and owed are less than or equal to 0", async () => {
    const bodyTestCases = [
      { bill: 0, owed: 0 },
      { bill: -100, owed: -50 },
      { bill: "bill", owed: "owed" }
    ];

    for (const body of bodyTestCases) {
      const res = await request(app).post("/calculate-change").send(body);

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toBe(
        "Bill and Owed must be numbers that are greater than 0"
      );
      expect(res.body.data).toBe(null);
    }
  });

  it("should return error if bill is less than owed", async () => {
    const res = await request(app)
      .post("/calculate-change")
      .send({ bill: 500, owed: 600 });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Bill must be greater than or equal to owed");
    expect(res.body.data).toBe(null);
  });

});
