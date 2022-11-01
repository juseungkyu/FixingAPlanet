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
				Canvas canvas = canvasDao.getCanvas(rs.getInt(5));
				
				Planet planet = new Planet(
						rs.getInt(1), 
						rs.getString(2), 
						rs.getString(3), 
						rs.getString(4), 
						canvas
					);
				output.add(planet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getPlanetAll error");
		}
		
		return output;
	}
}
