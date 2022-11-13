package controller.planet;

import java.io.File;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;
import java.util.Random;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.oreilly.servlet.MultipartRequest;

import common.Util;
import dao.PlanetDAO;
import vo.Planet;
import vo.User;

@WebServlet("/planet")
public class PlanetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static PlanetDAO planetDao = new PlanetDAO(); 
    
    public PlanetServlet() {
        super();
    }
    
	// 행성 생성하기
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String requestData = request.getParameter("json");
		
		if(requestData == null || requestData.length() == 0) {
			ps.println(Util.createErrorMessage("데이터가 비어있습니다."));
			return;
		}
		
		String title = "";
		String content = "";
		
		try {
			JSONParser parser = new JSONParser();
			Object obj = parser.parse( requestData );
			JSONObject requestJson = (JSONObject) obj;
			title = (String) requestJson.get("title");
			content = (String) requestJson.get("content");
		} catch (ParseException e) {
			ps.println(Util.createErrorMessage("데이터가 json 형식이 아닙니다."));
			return;
		}

		if(title == null || title.length() == 0) {
			ps.println(Util.createErrorMessage("title이 비어있습니다."));
			return;
		}
		if(content == null || content.length() == 0) {
			ps.println(Util.createErrorMessage("content가 비어있습니다."));
			return;
		}
		
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userSession");
		
		if(user == null) {
			ps.println(Util.createErrorMessage("유저의 세션이 확인되지 않습니다."));
			return;
		}
		
		int result = planetDao.createPlanet("/default.png", user.getUserId(), title, content);

		System.out.println(result);
		
		if(result == -1) {
			ps.println(Util.createErrorMessage("캔버스 생성 실패"));
			return;
		}
		if(result == 0) {
			ps.println(Util.createErrorMessage("행성 생성 중 오류가 발생했습니다."));
			return;
		}

		ps.println(Util.createSuccessMessage("행성 생성을 성공했습니다."));
	}

	// 행성정보 불러오기
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();
		
		String planetId = request.getParameter("planetId");
	    		
		if(planetId == null) {
			ps.println(Util.createErrorMessage("planetId가 감지되지 않습니다."));
			return;
		}

		int planetIdNumber = 0;
				
		try {
			planetIdNumber = Integer.parseInt(planetId);
		} catch (Exception e) {
			ps.println(Util.createErrorMessage("planetId가 숫자가 아닙니다."));
			return;
		}
		
		Planet planet = planetDao.getPlanet(planetIdNumber);
		
		if(planet == null) {
			ps.println(Util.createErrorMessage("존재하지 않는 행성입니다."));
			return;
		}
		
		JSONObject json = new JSONObject();
		json.put("result", Util.planetToJSON(planet));
		ps.println(json);
	}
	
	
}
