import { UrlService } from "../../src/services/url.service";
import * as nanoidUtil from "../../src/utils/nano.util";
describe("UrlService", () => {
  let service: any;

  const mockPrisma = {
    url: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockResponse = {
    id: 1,
    url: "https://test.com",
    code: "abc123",
    click: 0,
  };

  beforeEach(() => {
    service = new UrlService(mockPrisma as any);
    jest.clearAllMocks();
  });

  test("should return all URLs", async () => {
    mockPrisma.url.findMany.mockResolvedValue([mockResponse]);

    const res = await service.findAll();

    expect(res).toEqual([mockResponse]);
  });

  test("should save a new URL", async () => {
    mockPrisma.url.create.mockResolvedValue(mockResponse);

    const res = await service.saveUrl("http://localhost/test", "123abc");

    expect(res).toEqual(mockResponse);
  });

  test("should find url", async () => {
    mockPrisma.url.findUnique.mockResolvedValue(mockResponse);

    const res = await service.findByUrl("https://test.com");
    expect(res).toEqual(mockResponse);
  });

  test("should find code", async () => {
    mockPrisma.url.findUnique.mockResolvedValue(mockResponse);

    const res = await service.findByCode("123abc");
    expect(res).toEqual(mockResponse);
  });

  test("should generate unique code", async () => {
    const mockCode = "abc123";

    // Mock generateNanoId to always return 'abc123'
    jest.spyOn(nanoidUtil, "generateNanoId").mockReturnValue(mockCode);

    // Mock findByCode: first time it exists, second time it's unique
    const findByCodeMock = jest
      .spyOn(service, "findByCode")
      .mockResolvedValueOnce({ code: mockCode } as any) // simulate conflict
      .mockResolvedValueOnce(null); // now it's unique

    const result = await service.generateUniqueCode();

    expect(nanoidUtil.generateNanoId).toHaveBeenCalledTimes(2);
    expect(findByCodeMock).toHaveBeenCalledTimes(2);
    expect(result).toBe(mockCode);
  });

  test("should click increment by one", async () => {
    mockPrisma.url.update.mockResolvedValue(mockResponse);

    const res = await service.incrementClick("123abc");
    expect(res).toEqual(mockResponse);
  });
});
