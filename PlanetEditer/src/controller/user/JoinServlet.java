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

import common.DefaultMessage;
import dao.PlanetDAO;
import dao.UserDAO;
import vo.Canvas;
import vo.Planet;
import vo.User;

@WebServlet("/join")
public class JoinServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static UserDAO userDao = new UserDAO(); 
    public JoinServlet() {
        super();
    }
    
	// 회원가입
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();

		String playerId = request.getParameter("playerId");
		String playerPw = request.getParameter("playerPw");
		String playerName = request.getParameter("playerName");

		if(playerId == null) {
			ps.println(DefaultMessage.createErrorMessage("playerId가 감지되지 않습니다."));
			return;
		}
		if(playerPw == null) {
			ps.println(DefaultMessage.createErrorMessage("playerPw가 감지되지 않습니다."));
			return;
		}
		if(playerName == null) {
			ps.println(DefaultMessage.createErrorMessage("playerName가 감지되지 않습니다."));
			return;
		}
		
		int result = this.userDao.createUser(playerId, playerPw, playerName);
		if(result == -1) {
			ps.println(DefaultMessage.createErrorMessage("이미 존재하는 아이디입니다."));
			return;
		}
		if(result == 0) {
			ps.println(DefaultMessage.createErrorMessage("회원정보 생성을 실패했습니다."));
			return;
		}

		ps.println(DefaultMessage.createSuccessMessage("가입 되었습니다."));
	}
}
