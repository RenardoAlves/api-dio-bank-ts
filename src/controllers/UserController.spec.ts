import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })    
    })

    it('Deve informar um erro caso não seja inserido nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'exemplo@mail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Verificar se getAllUsers está sendo chamado', () => {
        const mockRequest = {
            body: {}
        } as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })

    it('Deve informar um erro caso não seja inserido e-mail', () => {
        const mockRequest = {
            body: {
                name: 'NomeExemplo',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    })

    it('Verificar se deleteUser mantém seu comportamento após refatorar', () => {
        const mockRequest = {
            body: {
                name: 'NomeExemplo',
                email: 'exemplo@mail.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    })
})
