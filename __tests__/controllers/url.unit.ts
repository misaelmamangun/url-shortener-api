import { error } from "console";
import { UrlController } from "../../src/controllers/url.controller";

describe("UrlController", () => {
  let controller: UrlController;
  let mockUrlService: any;
  let mockReply: any;
  const mockResponse = {
    id: 1,
    url: "https://test.com",
    code: "abc123",
    click: 0,
  };

  beforeEach(() => {
    mockUrlService = {
      findAll: jest.fn(),
      findByCode: jest.fn(),
      findByUrl: jest.fn(),
      generateCode: jest.fn(),
      generateUniqueCode: jest.fn(),
      saveUrl: jest.fn(),
      incrementClick: jest.fn(),
    };

    mockReply = {
      send: jest.fn(),
      code: jest.fn().mockReturnThis(),
      redirect: jest.fn(),
      log: {
        error: jest.fn(),
        info: jest.fn(),
      },
    };

    controller = new UrlController(mockUrlService);
    jest.clearAllMocks();
  });

  test("should return all URLs", async () => {
    mockUrlService.findAll.mockResolvedValue([mockResponse]);

    await controller.getAllUrl({} as any, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith({
      data: [mockResponse],
    });
  });

  test("should return existing URL message", async () => {
    mockUrlService.findByUrl.mockResolvedValue(mockResponse);

    await controller.shorten(
      {
        body: {
          url: "123abc",
        },
      } as any,
      mockReply
    );

    expect(mockReply.log.error).toHaveBeenCalledWith("URL already shortened");
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "URL already shortened",
    });
  });

  test("should create and return shortened URL", async () => {
    mockUrlService.findByUrl.mockResolvedValue(null);
    mockUrlService.generateUniqueCode.mockResolvedValue("123abc");
    mockUrlService.saveUrl.mockResolvedValue(mockResponse);

    await controller.shorten(
      {
        body: {
          url: "123abc",
        },
      } as any,
      mockReply
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      data: mockResponse,
      message: "Success",
    });
  });

  test("should return 404 if code not found", async () => {
    mockUrlService.findByCode.mockResolvedValue(null);

    await controller.redirect(
      {
        params: {
          code: "123abc",
        },
      } as any,
      mockReply
    );

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Short URL not found",
    });
  });

  test("should redirect if short code found", async () => {
    mockUrlService.findByCode.mockResolvedValue(mockResponse);

    await controller.redirect(
      {
        params: {
          code: "123abc",
        },
      } as any,
      mockReply
    );

    expect(mockReply.redirect).toHaveBeenCalledWith("https://test.com");
  });
});
