package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import common.JdbcUtil;
import vo.User;

public class UserDAO {
	// 유저 정보 가져오기
	public User getUser(String playerId) {
		User output = null;
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * FROM players WHERE player_id=?");
			pstmt.setString(1, playerId);
			rs = pstmt.executeQuery();

			if (rs.next()) {
				output = new User(
						rs.getString(1), 
						rs.getString(2), 
						rs.getString(3)
					);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getUser error");
		}
		JdbcUtil.close(conn, pstmt, rs);
		
		return output;
	}
	
	// 회원가입
	// -1 : 이미 있는 아이디
	//  0 : 생성 실패
	//  1 : 생성 성공
	public int createUser(String playerId, String playerPw, String playerName) {
		int output = 0;
		
		User user = this.getUser(playerId);
		if(user != null) {
			return -1;
		}
		
		Connection conn = null;
		PreparedStatement pstmt = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("INSERT INTO players(player_id, player_pw, player_name) " + 
					"VALUES(?,?,?)");
			pstmt.setString(1, playerId);
			pstmt.setString(2, playerPw);
			pstmt.setString(3, playerName);
			
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("createUser error");
		}
		
		JdbcUtil.close(conn, pstmt);
		
		return output;
	}
}
