package controller.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import common.HashUtil;
import common.Util;
import dao.UserDAO;

@WebServlet("/join")
public class JoinServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static UserDAO userDao = new UserDAO(); 
    public JoinServlet() {
        super();
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	super.doGet(req, resp);
    }
    
	// 회원가입
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
		
		String playerId = "";
		String playerPw = "";
		String playerName = "";
		
		try {
			JSONParser parser = new JSONParser();
			Object obj = parser.parse( requestData );
			JSONObject requestJson = (JSONObject) obj;
			playerId = (String) requestJson.get("id");
			playerPw = (String) requestJson.get("pw");
			playerName = (String) requestJson.get("name");
		} catch (ParseException e) {
			ps.println(Util.createErrorMessage("데이터가 json 형식이 아닙니다."));
			return;
		}
 
		if(playerId == null) {
			ps.println(Util.createErrorMessage("playerId가 감지되지 않습니다."));
			return;
		}
		if(playerPw == null) {
			ps.println(Util.createErrorMessage("playerPw가 감지되지 않습니다."));
			return;
		}
		if(playerName == null) {
			ps.println(Util.createErrorMessage("playerName가 감지되지 않습니다."));
			return;
		}

		String playerPwHash = HashUtil.stringTohash(playerPw);
		
		int result = this.userDao.createUser(playerId, playerPwHash, playerName);
		if(result == -1) {
			ps.println(Util.createErrorMessage("이미 존재하는 아이디입니다."));
			return;
		}
		if(result == 0) {
			ps.println(Util.createErrorMessage("회원정보 생성을 실패했습니다."));
			return;
		}

		ps.println(Util.createSuccessMessage("가입 되었습니다."));
	}
}
