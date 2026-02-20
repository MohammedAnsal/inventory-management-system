import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compares a plain text password with a hashed password
 * @param inputPassword - Plain text password to compare
 * @param hashedPassword - Hashed password from database
 * @returns True if passwords match, false otherwise
 */
export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export const generatePassword = async () =>
  await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
