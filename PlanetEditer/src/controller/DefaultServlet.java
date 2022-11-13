package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import vo.Canvas;
import vo.Planet;

public class DefaultServlet extends HttpServlet {

	// 행성을 json으로
	protected JSONObject planetToJSON(Planet planet) {
		JSONObject planetJson = new JSONObject();
		planetJson.put("planetId", planet.getPlanetId());
		planetJson.put("planetTitle", planet.getPlanetTitle());
		planetJson.put("planetContent", planet.getPlanetContent());
		planetJson.put("playerId", planet.getPlayerId());
		

		Canvas canvas = planet.getCanvas();
		planetJson.put("canvas", this.canvasToJSON(canvas));
		
		return planetJson;
	}
	
	// 캔버스를 json으로
	protected JSONObject canvasToJSON(Canvas canvas) {
		JSONObject canvasJson = new JSONObject();

		canvasJson.put("canvasId", canvas.getCanvasId());
		canvasJson.put("canvasMapAddr", canvas.getCanvasMapAddr());
		canvasJson.put("canvasBumpMapAddr", canvas.getCanvasBumpMapAddr());
		canvasJson.put("canvasContinentMapAddr", canvas.getCanvasContinentMapAddr());
		canvasJson.put("canvasCloudMapAddr", canvas.getCanvasCloudMapAddr());
		
		return canvasJson;
	}
	
	// 성공 메시지
	protected JSONObject createErrorMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("err", message);

		return err;
	}

	// 오류 메시지
	protected JSONObject createSuccessMessage(String msg) {
		JSONObject err = new JSONObject();
		JSONObject message = new JSONObject();
		
		message.put("message", msg);
		err.put("result", message);

		return err;
	}

}
