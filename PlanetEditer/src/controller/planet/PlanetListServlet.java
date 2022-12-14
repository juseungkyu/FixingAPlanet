package controller.planet;

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

import common.Util;
import dao.PlanetDAO;
import vo.Planet;
import vo.User;

@WebServlet("/planet/all")
public class PlanetListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PlanetDAO planetDao = new PlanetDAO();
	
    public PlanetListServlet() {
        super();
    }
    
	// 행성 정보 리스트 불러오기
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String type = request.getParameter("type");
		
		ArrayList<Planet> list = null;

		if(type == null) {
			return;
		}
		if(type.equals("all")) {
			list = planetDao.getPlanetAll();
		}
		if(type.equals("my")) {
			HttpSession session = request.getSession();
			User user = (User) session.getAttribute("userSession");
			
			if(user == null) {
				ps.println(Util.createErrorMessage("유저의 세션이 확인되지 않습니다."));
				return;
			}
			
			list = planetDao.getMyPlanetList(user.getUserId());
		}
		
		JSONObject json = new JSONObject();
		JSONArray planetList = new JSONArray();
		
		for (Planet planet : list) {
			planetList.add(Util.planetToJSON(planet)); 
		}
		
		json.put("result", planetList);
		ps.println(json);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
