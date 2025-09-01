import { JWTPayload, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (user: JWTPayload) => {
  if (user)
    //     const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
    //   .setProtectedHeader({ alg })
    //   .setIssuedAt()
    //   .setIssuer('urn:example:issuer')
    //   .setAudience('urn:example:audience')
    //   .setExpirationTime('2h')
    //   .sign(secret)

    // console.log(jwt)
    return await new SignJWT(user)
      .setIssuedAt()
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(key);
};
