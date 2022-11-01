package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.PlanetDAO;
import vo.Canvas;
import vo.Planet;

@WebServlet("/planet/get")
public class GetPlanetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PlanetDAO planetDao;
	
    public GetPlanetServlet() {
        super();
        this.planetDao = new PlanetDAO();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String planetId = request.getParameter("planetId");
		
		if(planetId == null) {
			ps.println("{'err' : {'message' : 'planetId가 감지되지 않습니다.'}}");
			return;
		}

		int planetIdNumber = 0;
				
		try {
			planetIdNumber = Integer.parseInt(planetId);
		} catch (Exception e) {
			ps.println("{'err' : {'message' : 'planetId가 숫자가 아닙니다.'}}");
			return;
		}
		
		Planet planet = planetDao.getPlanet(planetIdNumber);
		
		JSONObject json = new JSONObject();
		json.put("result", this.planetToJSON(planet));
		ps.println(json);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	private JSONObject planetToJSON(Planet planet) {
		JSONObject planetJson = new JSONObject();
		planetJson.put("planetId", planet.getPlanetId());
		planetJson.put("planetTitle", planet.getPlanetTitle());
		planetJson.put("planetContent", planet.getPlanetContent());
		planetJson.put("playerId", planet.getPlayerId());
		

		Canvas canvas = planet.getCanvas();
		planetJson.put("canvas", this.canvasToJSON(canvas));
		
		return planetJson;
	}
	
	private JSONObject canvasToJSON(Canvas canvas) {
		JSONObject canvasJson = new JSONObject();

		canvasJson.put("canvasId", canvas.getCanvasId());
		canvasJson.put("canvasMapAddr", canvas.getCanvasMapAddr());
		canvasJson.put("canvasBumpMapAddr", canvas.getCanvasBumpMapAddr());
		canvasJson.put("canvasContinentMapAddr", canvas.getCanvasContinentMapAddr());
		canvasJson.put("canvasCloudMapAddr", canvas.getCanvasCloudMapAddr());
		
		return canvasJson;
	}
}
