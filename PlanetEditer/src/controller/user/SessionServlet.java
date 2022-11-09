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

		String playerId = request.getParameter("playerId");
		String playerPw = request.getParameter("playerPw");

		if(playerId == null) {
			ps.println(this.createErrorMessage("playerId가 감지되지 않습니다."));
			return;
		}
		if(playerPw == null) {
			ps.println(this.createErrorMessage("playerPw가 감지되지 않습니다."));
			return;
		}
		
		User user = this.userDao.getUser(playerId);
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

		ps.println("{'result' : {'message' : '로그아웃 되었습니다.'}}");
	}
}
