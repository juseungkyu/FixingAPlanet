package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import dao.PlanetDAO;
import vo.Canvas;
import vo.Planet;
import vo.User;

@WebServlet("/planet/create")
public class CreatePlanetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PlanetDAO planetDao = new PlanetDAO(); 
    public CreatePlanetServlet() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String title = request.getParameter("title");
		String content = request.getParameter("content");

		if(title == null || title.length() == 0) {
			ps.println("{'err' : {'message' : 'title이 비어있습니다.'}}");
			return;
		}
		if(content == null || content.length() == 0) {
			ps.println("{'err' : {'message' : 'content이 비어있습니다.'}}");
			return;
		}
		
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userSession");
		
		if(user == null) {
			ps.println("{'err' : {'message' : '유저의 세션이 확인되지 않습니다.'}}");
			return;
		}
		
		Planet createdPlanet = planetDao.createPlanet("/url", user.getUserName(), title, content);
		
		if(createdPlanet == null) {
			ps.println("{'err' : {'message' : '행성 생성 중 오류가 발생했습니다.'}}");
			return;
		}

		JSONObject json = new JSONObject();
		json.put("result", this.planetToJSON(createdPlanet));
		ps.println(json);
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
