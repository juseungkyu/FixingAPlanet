package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcUtil;
import vo.Canvas;
import vo.Planet;

public class PlanetDAO {
	private CanvasDAO canvasDao = new CanvasDAO();

	// 행성 리스트 불러오기
	public ArrayList<Planet> getPlanetAll() {
		ArrayList<Planet> output = new ArrayList<Planet>();
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * from planets");
			rs = pstmt.executeQuery();

			while (rs.next()) {
				Canvas canvas = canvasDao.getCanvas(rs.getInt(6));
				
				Planet planet = new Planet(
						rs.getInt(1), 
						rs.getString(2), 
						rs.getString(3), 
						rs.getString(4), 
						rs.getInt(5), 
						canvas
					);
				output.add(planet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getPlanetAll error");
		}
		JdbcUtil.close(conn, pstmt, rs);
		
		return output;
	}
	
	// 자신의 행성 리스트 불러오기
	public ArrayList<Planet> getMyPlanetList(String userId) {
		ArrayList<Planet> output = new ArrayList<Planet>();
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * from planets WHERE player_id=?");
			pstmt.setString(1, userId);
			rs = pstmt.executeQuery();

			while (rs.next()) {
				Canvas canvas = canvasDao.getCanvas(rs.getInt(6));
				
				Planet planet = new Planet(
						rs.getInt(1), 
						rs.getString(2), 
						rs.getString(3), 
						rs.getString(4), 
						rs.getInt(5), 
						canvas
					);
				output.add(planet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getPlanetAll error");
		}
		JdbcUtil.close(conn, pstmt, rs);
		
		return output;
	}
	
	// 행성 불러오기
	public Planet getPlanet(int planetId) {
		Planet output = null;
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * FROM planets WHERE planet_id=?");
			pstmt.setInt(1, planetId);
			rs = pstmt.executeQuery();

			if (rs.next()) {
				Canvas canvas = canvasDao.getCanvas(rs.getInt(6));
				
				output = new Planet(
						rs.getInt(1), 
						rs.getString(2), 
						rs.getString(3), 
						rs.getString(4), 
						rs.getInt(5), 
						canvas
					);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getPlanetAll error");
		}

		JdbcUtil.close(conn, pstmt, rs);
		return output;
	}
	
	// 행성 생성하기
	public int createPlanet(String url, String playerId, String title, String content) {
		int output = 0;
		Canvas canvas = this.canvasDao.createCanvas(url);
		
		if(canvas == null) {
			System.out.println("캔버스 생성 실패");
			output = -1;
			return output;
		}

		Connection conn = null;
		PreparedStatement pstmt = null;
		
		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("INSERT INTO planets(planet_id, player_id, planet_title, planet_content, canvas_id) " + 
					"VALUES(PLANTES_SEQ.NEXTVAL, ?, ?, ?, ?)");
			pstmt.setString(1, playerId);
			pstmt.setString(2, title);
			pstmt.setString(3, content);
			pstmt.setInt(4, canvas.getCanvasId());
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("createPlanet error");
		}
		
		JdbcUtil.close(conn, pstmt);
		
		return output;
	}

	public int changeSeaLevel(int planetId, int seaLevel) {
		int output = 0;
		
		Connection conn = null;
		PreparedStatement pstmt = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("UPDATE planets " + 
					"SET planet_sea_level=? " + 
					"WHERE planet_id=?");
			pstmt.setInt(1, seaLevel);
			pstmt.setInt(2, planetId);
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("changeSeaLevel error");
		}

		JdbcUtil.close(conn, pstmt);
		return output;
	}

	public int deletePlanet(int planetId) {
		int output = 0;
		
		Connection conn = null;
		PreparedStatement pstmt = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("DELETE FROM planets " + 
					"WHERE planet_id=?");
			pstmt.setInt(1, planetId);
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("deletePlanet error");
		}
		JdbcUtil.close(conn, pstmt);
		
		return output;
	}

	public int updatePlanetInfo(int planetId, String title, String content) {
		int output = 0;
		
		Connection conn = null;
		PreparedStatement pstmt = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("UPDATE planets " + 
					"SET planet_title=?, planet_content=?" + 
					"WHERE planet_id=?");
			pstmt.setString(1, title);
			pstmt.setString(2, content);
			pstmt.setInt(3, planetId);
			output = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("updatePlanetInfo error");
		}

		JdbcUtil.close(conn, pstmt);
		return output;
	}	
}
