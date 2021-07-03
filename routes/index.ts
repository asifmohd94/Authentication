import express, { NextFunction, Request, Response } from 'express'
import { signInService, SignInService } from '../services/signin.service';
import { SignInController, signInController } from '../controller/signin.controller'

class IndexRouter {

  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;

    this.router.post('/signin', signInController.Signin);

    this.router.post('/register', signInController.Register);

    this.router.post('/user',)
  }

 

}


export default new IndexRouter(express.Router())




