export enum AppRoute {
  Root = '/',
  Login = '/login',
  Error404 = '/*',
  Room = '/room'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
