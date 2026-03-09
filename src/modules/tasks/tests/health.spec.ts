import { describe, it, expect } from "vitest"
import { buildApp } from "../../../app.js"

describe("Health Check", () => {

  it("should return status 200", async () => {

    const app = buildApp()

    await app.ready()

    const response = await app.inject({
      method: "GET",
      url: "/health"
    })

    expect(response.statusCode).toBe(200)

  })

})