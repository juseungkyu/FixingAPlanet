package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class JdbcUtil {
	public static Connection conn = null;
	public static Connection getConnection() {
		if(conn == null) {
			try {
				Class.forName("oracle.jdbc.driver.OracleDriver");
				conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl", "hr", "hr");
				
				
//				xe용
//				conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "1234");			
			} catch (Exception e) {
				System.out.println("DB 연결 실패");
				e.printStackTrace();
			}
		}
		
		return conn;
	}
}
