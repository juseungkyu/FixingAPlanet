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
	// 캔버스 하나 불러오기
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
	
	// 캔버스 생성하기
	public Canvas createCanvas(String url) {
		Canvas output = null;
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("INSERT INTO canvas(canvas_id, canvas_map_addr, canvas_bump_map_addr, canvas_color_map_addr, canvas_continent_map_addr, canvas_cloud_map_addr) "
					+ "VALUES(CANVAS_SEQ.NEXTVAL, ?, ?, ?, ?, ?)");
			pstmt.setString(1, url);
			pstmt.setString(2, url);
			pstmt.setString(3, url);
			pstmt.setString(4, url);
			pstmt.setString(5, url);
			int result = pstmt.executeUpdate();
			
			if(result == 0) {
				return null;
			}
			
			pstmt = conn.prepareStatement("SELECT * FROM canvas WHERE canvas_id=(SELECT MAX(canvas_id) FROM canvas)");
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
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
			System.out.println("createCanvas error");
		}
		
		return output;
	}
	
	// 행성 저장하기
	public int putCanvas(int canvasId, String url) {
		int output = 0;
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("UPDATE canvas " + 
					"SET canvas_map_addr=?, canvas_bump_map_addr=?, canvas_color_map_addr=?, canvas_continent_map_addr=?, canvas_cloud_map_addr=? " + 
					"WHERE canvas_id=?");
			pstmt.setString(1, url);
			pstmt.setString(2, url);
			pstmt.setString(3, url);
			pstmt.setString(4, url);
			pstmt.setString(5, url);
			pstmt.setInt(6, canvasId);
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("putCanvas error");
		}
		
		return output;
	}
}
