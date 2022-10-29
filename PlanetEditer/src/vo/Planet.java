package vo;

public class Planet {
	private int planetId;
	private String playerId;
	private String playerTitle;
	private String playerContent;
	private String planetMapAddr;
	private String planetBumpMapAddr;
	private String planetColorMapAddr;
	private String planetContinentMapAddr;
	private String planetColundMapAddr;
	
	public Planet(int planetId, String playerId, String playerTitle, String playerContent, String planetMapAddr,
			String planetBumpMapAddr, String planetColorMapAddr, String planetContinentMapAddr,
			String planetColundMapAddr) {
		super();
		this.planetId = planetId;
		this.playerId = playerId;
		this.playerTitle = playerTitle;
		this.playerContent = playerContent;
		this.planetMapAddr = planetMapAddr;
		this.planetBumpMapAddr = planetBumpMapAddr;
		this.planetColorMapAddr = planetColorMapAddr;
		this.planetContinentMapAddr = planetContinentMapAddr;
		this.planetColundMapAddr = planetColundMapAddr;
	}

	public int getPlanetId() {
		return planetId;
	}

	public void setPlanetId(int planetId) {
		this.planetId = planetId;
	}

	public String getPlayerId() {
		return playerId;
	}

	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}

	public String getPlayerTitle() {
		return playerTitle;
	}

	public void setPlayerTitle(String playerTitle) {
		this.playerTitle = playerTitle;
	}

	public String getPlayerContent() {
		return playerContent;
	}

	public void setPlayerContent(String playerContent) {
		this.playerContent = playerContent;
	}

	public String getPlanetMapAddr() {
		return planetMapAddr;
	}

	public void setPlanetMapAddr(String planetMapAddr) {
		this.planetMapAddr = planetMapAddr;
	}

	public String getPlanetBumpMapAddr() {
		return planetBumpMapAddr;
	}

	public void setPlanetBumpMapAddr(String planetBumpMapAddr) {
		this.planetBumpMapAddr = planetBumpMapAddr;
	}

	public String getPlanetColorMapAddr() {
		return planetColorMapAddr;
	}

	public void setPlanetColorMapAddr(String planetColorMapAddr) {
		this.planetColorMapAddr = planetColorMapAddr;
	}

	public String getPlanetContinentMapAddr() {
		return planetContinentMapAddr;
	}

	public void setPlanetContinentMapAddr(String planetContinentMapAddr) {
		this.planetContinentMapAddr = planetContinentMapAddr;
	}

	public String getPlanetColundMapAddr() {
		return planetColundMapAddr;
	}

	public void setPlanetColundMapAddr(String planetColundMapAddr) {
		this.planetColundMapAddr = planetColundMapAddr;
	}
	
	
}
