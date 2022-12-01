import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

export class FunctionsApiClient {
  functions: Functions;

  constructor() {
    this.functions = getFunctions();
    this.functions.region = 'asia-northeast1';
  }

  callGetOgpInfo() {
    return httpsCallable(this.functions, 'getOgpInfo');
  }
}
