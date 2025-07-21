export type JwtPayload = {
  preferred_username: string;
  realm_access?: {
    roles: string[];
  };
  exp?: number;
};

export type DecodedUser = {
  username: string;
  roles: string[];
  exp?: number;
};
