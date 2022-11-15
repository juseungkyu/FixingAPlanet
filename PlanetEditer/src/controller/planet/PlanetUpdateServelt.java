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

// tomcat 기본 설정이 PUT, DELETE를 막아놔서 수행 제출하고 작동 안될까봐 따로 준비 
@WebServlet("/planet/update")
public class PlanetUpdateServelt extends HttpServlet {
    private static PlanetDAO planetDao = new PlanetDAO(); 

	// 행성 정보 수정
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
		Integer planetId = 0;
		
		try {
			JSONParser parser = new JSONParser();
			Object obj = parser.parse( requestData );
			JSONObject requestJson = (JSONObject) obj;
			title = (String) requestJson.get("title");
			content = (String) requestJson.get("content");
			planetId = (int) requestJson.get("planetId");
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
		
		Planet planet = this.planetDao.getPlanet(planetId);
		if(planet == null) {
			ps.println(Util.createErrorMessage("행성이 존재하지 않습니다."));
			return;
		}
		
		if(user.getUserId() == planet.getPlayerId()) {
			ps.println(Util.createErrorMessage("행성의 소유자가 아닙니다."));
			return;
		}
		
		int result = planetDao.updatePlanetInfo(planetId, title, content);
		
		if(result == 0) {
			ps.println(Util.createErrorMessage("행성 정보 수정 중 오류가 발생했습니다."));
			return;
		}

		ps.println(Util.createSuccessMessage("행성 정보 수정을 성공했습니다."));
	}
}
