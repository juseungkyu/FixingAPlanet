package common;

import org.json.simple.JSONObject;

public class DefaultMessage {
	public static JSONObject createErrorMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("err", message);

		return err;
	}
	public static JSONObject createSuccessMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("result", message);

		return err;
	}
}
