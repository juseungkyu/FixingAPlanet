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

import com.oreilly.servlet.MultipartRequest;

import common.Util;
import dao.PlanetDAO;
import vo.Planet;
import vo.User;

// tomcat 기본 설정이 PUT, DELETE를 막아놔서 수행 제출하고 작동 안될까봐 따로 준비 
@WebServlet("/planet/delete")
public class PlanetDeleteServelt extends HttpServlet {
    private static PlanetDAO planetDao = new PlanetDAO(); 

	// 행성 삭제
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
		
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("userSession");
		
		if(user == null) {
			ps.println(Util.createErrorMessage("유저의 세션이 확인되지 않습니다."));
			return;
		}
		
		int result = this.planetDao.deletePlanet(planetIdNumber);
		
		if(result == 0) {
			ps.println(Util.createErrorMessage("행성을 삭제하지 못했습니다."));
		}

		ps.println(Util.createSuccessMessage("행성이 삭제되었습니다."));
	}
}
