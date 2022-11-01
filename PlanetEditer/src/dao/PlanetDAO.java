package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import common.JdbcUtil;
import vo.Planet;

public class PlanetDAO {
	public ArrayList<Planet> getPlanetAll() {
		ArrayList<Planet> output = new ArrayList<Planet>();
				
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("SELECT * from planet");
			rs = pstmt.executeQuery();

			while (rs.next()) {
				Planet planet = new Planet(
						rs.getInt(1), 
						rs.getString(2), 
						rs.getString(3), 
						rs.getString(4), 
						rs.getString(5),
						rs.getString(6), 
						rs.getString(7), 
						rs.getString(8),
						rs.getString(9)
					);
				output.add(planet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn, pstmt, rs);
		}
		
		return output;
	}
}
