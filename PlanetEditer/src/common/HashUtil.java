package common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {
	private static String SALT = "20221114";
	final private static char[] hexArray = "0123456789ABCDEF".toCharArray();
	
	public static String stringTohash(String str) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(SALT.getBytes());
			md.update(str.getBytes());

			byte[] out = md.digest();
			return bytesToHex(out);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}

	public static String bytesToHex(byte[] bytes) {
		char[] hexChars = new char[bytes.length * 2];
		int v;
		for (int j = 0; j < bytes.length; j++) {
			v = bytes[j] & 0xFF;
			hexChars[j * 2] = hexArray[v >>> 4];
			hexChars[j * 2 + 1] = hexArray[v & 0x0F];
		}
		return new String(hexChars);
	}
}
