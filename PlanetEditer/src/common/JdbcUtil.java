package common;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class JdbcUtil {
	public static Connection conn = null;

	public static Connection getConnection() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
//				conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl", "hr", "hr");

//				xe용
			conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "1234");
		} catch (Exception e) {
			System.out.println("DB 연결 실패");
			e.printStackTrace();

		}

		return conn;
	}
	
	public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
		try {
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		close(conn, pstmt);
	}
	
	public static void close(Connection conn, PreparedStatement pstmt) {
		try {
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			pstmt.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
