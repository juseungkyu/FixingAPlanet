CREATE TABLE players(
	player_id nvarchar2(2000) CONSTRAINT players_id_pk primary key,

	player_pw nvarchar2(2000),
	player_name nvarchar2(2000)
);

CREATE TABLE canvas(
	canvas_id number CONSTRAINT canvas_id_pk primary key,

	canvas_map_addr nvarchar2(2000),
	canvas_bump_map_addr nvarchar2(2000),
	canvas_color_map_addr nvarchar2(2000),
	canvas_continent_map_addr nvarchar2(2000),
	canvas_cloud_map_addr nvarchar2(2000)
);

CREATE TABLE planets(
	planet_id number CONSTRAINT planets_id_pk primary key,

	player_id nvarchar2(2000) CONSTRAINT planets_player_id_fk REFERENCES players(player_id),
	planet_title nvarchar2(2000),
	planet_content nvarchar2(2000),
	planet_sea_level number,
	canvas_id number CONSTRAINT planets_canvas_id_fk REFERENCES canvas(canvas_id)
);

CREATE SEQUENCE PLANTES_SEQ 
INCREMENT BY 1 
START WITH 1 
MINVALUE 1 
NOCYCLE;

CREATE SEQUENCE CANVAS_SEQ 
INCREMENT BY 1 
START WITH 1 
MINVALUE 1 
NOCYCLE;

SELECT * FROM players; 

DROP TABLE planets;
DROP TABLE players;
DROP TABLE canvas;