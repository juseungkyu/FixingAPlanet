package vo;

public class Planet {
	private int planetId;
	private String playerId;
	private String planetTitle;
	private String planetContent;
	private Canvas canvas;
	public Planet(int planetId, String playerId, String planetTitle, String planetContent, Canvas canvas) {
		super();
		this.planetId = planetId;
		this.playerId = playerId;
		this.planetTitle = planetTitle;
		this.planetContent = planetContent;
		this.canvas = canvas;
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
	public String getPlanetTitle() {
		return planetTitle;
	}
	public void setPlanetTitle(String planetTitle) {
		this.planetTitle = planetTitle;
	}
	public String getPlanetContent() {
		return planetContent;
	}
	public void setPlanetContent(String planetContent) {
		this.planetContent = planetContent;
	}
	public Canvas getCanvas() {
		return canvas;
	}
	public void setCanvas(Canvas canvas) {
		this.canvas = canvas;
	}

}
