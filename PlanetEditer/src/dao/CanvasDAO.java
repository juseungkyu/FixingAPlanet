package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcUtil;
import vo.Canvas;
import vo.Planet;

public class CanvasDAO {
	public Canvas getCanvas(int canvasId) {
		Canvas output = null;
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * FROM canvas WHERE canvas_id=?");
			pstmt.setInt(1, canvasId);
			rs = pstmt.executeQuery();

			if (rs.next()) {
				
				output = new Canvas(
						rs.getInt(1),
						rs.getString(2),
						rs.getString(3),
						rs.getString(4),
						rs.getString(5),
						rs.getString(6)
					);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getCanvas error");
		}
		
		return output;
		
	}
}
