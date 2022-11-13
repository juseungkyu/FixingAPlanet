package controller.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import controller.DefaultServlet;
import dao.PlanetDAO;
import dao.UserDAO;
import vo.Canvas;
import vo.Planet;
import vo.User;

@WebServlet("/session")
public class SessionServlet extends DefaultServlet {
	private static final long serialVersionUID = 1L;
    private static UserDAO userDao = new UserDAO(); 
    public SessionServlet() {
        super();
    }
    
	// 로그인
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();

		String requestData = request.getParameter("json");
		
		if(requestData == null || requestData.length() == 0) {
			ps.println(this.createErrorMessage("데이터가 비어있습니다."));
			return;
		}
		
		String playerId = "";
		String playerPw = "";
		
		try {
			JSONParser parser = new JSONParser();
			Object obj = parser.parse( requestData );
			JSONObject requestJson = (JSONObject) obj;
			playerId = (String) requestJson.get("id");
			playerPw = (String) requestJson.get("pw");
		} catch (ParseException e) {
			ps.println(this.createErrorMessage("데이터가 json 형식이 아닙니다."));
			return;
		}

		if(playerId == null) {
			ps.println(this.createErrorMessage("playerId가 감지되지 않습니다."));
			return;
		}
		if(playerPw == null) {
			ps.println(this.createErrorMessage("playerPw가 감지되지 않습니다."));
			return;
		}
		
		User user = this.userDao.getUser(playerId);
		if(user == null) {
			ps.println(this.createErrorMessage("확인 되지 않는 회원입니다."));
			return;
		}
		if(!user.getUserPw().equals(playerPw)) {
			ps.println(this.createErrorMessage("올바르지 않은 비밀번호입니다."));
			return;
		}
		
		HttpSession session = request.getSession();
		session.setAttribute("userSession", user);

		ps.println(this.createSuccessMessage("로그인 성공했습니다."));
	}

	// 로그아웃
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();

		HttpSession session = request.getSession();
		session.removeAttribute("userSession");

		ps.println(this.createSuccessMessage("로그아웃 성공"));
	}
}
