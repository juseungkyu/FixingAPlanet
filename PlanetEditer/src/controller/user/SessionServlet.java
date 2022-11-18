package controller.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import common.HashUtil;
import common.Util;
import dao.PlanetDAO;
import dao.UserDAO;
import sun.security.krb5.internal.PAData.SaltAndParams;
import vo.Canvas;
import vo.Planet;
import vo.User;

@WebServlet("/session")
public class SessionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static UserDAO userDao = new UserDAO();

	public SessionServlet() {
		super();
	}

	// 로그인
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter(); 

		String requestData = request.getParameter("json");

		if (requestData == null || requestData.length() == 0) {
			ps.println(Util.createErrorMessage("데이터가 비어있습니다."));
			return;
		}

		String playerId = "";
		String playerPw = "";

		try {
			JSONParser parser = new JSONParser();
			Object obj = parser.parse(requestData);
			JSONObject requestJson = (JSONObject) obj;
			playerId = (String) requestJson.get("id");
			playerPw = (String) requestJson.get("pw");
		} catch (ParseException e) {
			ps.println(Util.createErrorMessage("데이터가 json 형식이 아닙니다."));
			return;
		}

		if (playerId == null) {
			ps.println(Util.createErrorMessage("playerId가 감지되지 않습니다."));
			return;
		}
		if (playerPw == null) {
			ps.println(Util.createErrorMessage("playerPw가 감지되지 않습니다."));
			return;
		}

		User user = this.userDao.getUser(playerId);
		if (user == null) {
			ps.println(Util.createErrorMessage("확인 되지 않는 회원입니다."));
			return;
		}

		String playerPwHash = HashUtil.stringTohash(playerPw);

		if (!playerPwHash.equals(user.getUserPw())) {
			ps.println(Util.createErrorMessage("올바르지 않은 비밀번호입니다."));
			return;
		}

		HttpSession session = request.getSession();
		session.setAttribute("userSession", user);

		JSONObject json = new JSONObject();
		json.put("result", Util.UserToJSON(user));
		ps.println(json);
	}

	// 로그아웃
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter ps = response.getWriter();

		HttpSession session = request.getSession();
		session.removeAttribute("userSession");

		ps.println(Util.createSuccessMessage("로그아웃 성공"));
	}
}
