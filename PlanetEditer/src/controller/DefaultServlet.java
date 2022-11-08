package controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

public class DefaultServlet extends HttpServlet {
	protected JSONObject createErrorMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("err", message);

		return err;
	}
	protected JSONObject createSuccessMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("result", message);

		return err;
	}
}
