// Example for a controller with create, get, update, delete
describe('controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create and return 201', async () => {
        mock.create.mockResolvedValue({ id: 1 });
        await controller.create(req, res);
        expect(mock.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it('should handle create error', async () => {
        mock.create.mockRejectedValue(new Error('fail'));
        await controller.create(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'fail' });
    });

    it('should get by id and return 200', async () => {
        mock.getById.mockResolvedValue({ id: 1 });
        req.params.id = 1;
        await controller.getById(req, res);
        expect(mock.getById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return 404 if not found', async () => {
        mock.getById.mockResolvedValue(null);
        req.params.id = 1;
        await controller.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });

    it('should handle getById error', async () => {
        mock.getById.mockRejectedValue(new Error('fail'));
        req.params.id = 1;
        await controller.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'fail' });
    });

    // Repeat for update and delete, covering all branches
});