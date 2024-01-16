

const getBoundaries = `
SELECT json_build_object(
  'type',       'Feature',
  'geometry',   ST_AsGeoJSON(geom)::json,
  'properties', json_build_object(
    'gid', gid,
    'city', nama_kabko,
    'population_2018', population_2018,
    'population_2019', population_2019,
    'population_2020', population_2020,
    'population_2021', population_2021,
    'population_2022', population_2022,
    'bua_2018', bua_2018,
    'bua_2019', bua_2019,
    'bua_2020', bua_2020,
    'bua_2021', bua_2021,
    'bua_2022', bua_2022,
    'area', area
   )
) AS buaOutline
FROM kp."buaData";`

const getBoundariesName = `
SELECT json_build_object(
  'type',       'Feature',
  'geometry',   ST_Envelope(ST_AsGeoJSON(geom)::geometry)::json,
  'properties', json_build_object(
    'gid', gid,
    'city', nama_kabko,
    'bua_2018', bua_2018,
    'bua_2019', bua_2019,
    'bua_2020', bua_2020,
    'bua_2021', bua_2021,
    'bua_2022', bua_2022
   )
) AS cityOutline
FROM kp."buaData"
WHERE nama_kabko = $1;`

const getChartData = `
SELECT
  (SUM("rawBua_2018") / SUM(area)) * 100 as totalbua_2018,
  (SUM("rawBua_2019") / SUM(area)) * 100 as totalbua_2019,
  (SUM("rawBua_2020") / SUM(area)) * 100 as totalbua_2020,
  (SUM("rawBua_2021") / SUM(area)) * 100 as totalbua_2021,
  (SUM("rawBua_2022") / SUM(area)) * 100 as totalbua_2022,
  SUM(population_2018) as totalpopulation_2018,
  SUM(population_2019) as totalpopulation_2019,
  SUM(population_2020) as totalpopulation_2020,
  SUM(population_2021) as totalpopulation_2021,
  SUM(population_2022) as totalpopulation_2022
FROM kp."buaData";`

const getCount2018 = `
WITH AllIntervals AS (
  SELECT
    unnest(ARRAY['1.0-5', '2.6-33', '3.34-50', '4.51-67', '5.68-83', '6.84-99', '7.100']) AS buaInterval
)

SELECT
  COALESCE(countBua, 0) AS countBua,
  ai.buaInterval
FROM
  AllIntervals ai
LEFT JOIN (
  SELECT
    COUNT(*) AS countBua,
    CASE
       WHEN bua_2018 BETWEEN 0 AND 5 THEN '1.0-5'
       WHEN bua_2018 BETWEEN 5 AND 33 THEN '2.6-33'
       WHEN bua_2018 BETWEEN 33 AND 50 THEN '3.34-50'
       WHEN bua_2018 BETWEEN 50 AND 67 THEN '4.51-67'
	     WHEN bua_2018 BETWEEN 67 AND 83 THEN '5.68-83'
       WHEN bua_2018 BETWEEN 83 AND 99.9 THEN '6.84-99'
	     WHEN bua_2018 = 100 THEN '7.100'
    END AS buaInterval
  FROM
    kp."buaGrid"
  WHERE
    nama_kabko = $1 AND bua_2022 IS NOT NULL
  GROUP BY
    buaInterval
) AS QueryResult
ON ai.buaInterval = QueryResult.buaInterval
ORDER BY
  ai.buaInterval;`

const getCount2019 = `
WITH AllIntervals AS (
  SELECT
    unnest(ARRAY['1.0-5', '2.6-33', '3.34-50', '4.51-67', '5.68-83', '6.84-99', '7.100']) AS buaInterval
)

SELECT
  COALESCE(countBua, 0) AS countBua,
  ai.buaInterval
FROM
  AllIntervals ai
LEFT JOIN (
  SELECT
    COUNT(*) AS countBua,
    CASE
       WHEN bua_2019 BETWEEN 0 AND 5 THEN '1.0-5'
       WHEN bua_2019 BETWEEN 5 AND 33 THEN '2.6-33'
       WHEN bua_2019 BETWEEN 33 AND 50 THEN '3.34-50'
       WHEN bua_2019 BETWEEN 50 AND 67 THEN '4.51-67'
	     WHEN bua_2019 BETWEEN 67 AND 83 THEN '5.68-83'
       WHEN bua_2019 BETWEEN 83 AND 99.9 THEN '6.84-99'
	     WHEN bua_2019 = 100 THEN '7.100'
    END AS buaInterval
  FROM
    kp."buaGrid"
  WHERE
    nama_kabko = $1 AND bua_2022 IS NOT NULL
  GROUP BY
    buaInterval
) AS QueryResult
ON ai.buaInterval = QueryResult.buaInterval
ORDER BY
  ai.buaInterval;`;

const getCount2020 = `
WITH AllIntervals AS (
  SELECT
    unnest(ARRAY['1.0-5', '2.6-33', '3.34-50', '4.51-67', '5.68-83', '6.84-99', '7.100']) AS buaInterval
)

SELECT
  COALESCE(countBua, 0) AS countBua,
  ai.buaInterval
FROM
  AllIntervals ai
LEFT JOIN (
  SELECT
    COUNT(*) AS countBua,
    CASE
      WHEN bua_2020 BETWEEN 0 AND 5 THEN '1.0-5'
      WHEN bua_2020 BETWEEN 5 AND 33 THEN '2.6-33'
      WHEN bua_2020 BETWEEN 33 AND 50 THEN '3.34-50'
	    WHEN bua_2020 BETWEEN 50 AND 67 THEN '4.51-67'
	    WHEN bua_2020 BETWEEN 67 AND 83 THEN '5.68-83'
    	WHEN bua_2020 BETWEEN 83 AND 99.9 THEN '6.84-99'
	    WHEN bua_2020 = 100 THEN '7.100'
    END AS buaInterval
  FROM
    kp."buaGrid"
  WHERE
    nama_kabko = $1 AND bua_2022 IS NOT NULL
  GROUP BY
    buaInterval
) AS QueryResult
ON ai.buaInterval = QueryResult.buaInterval
ORDER BY
  ai.buaInterval;`;

const getCount2021 = `
WITH AllIntervals AS (
  SELECT
    unnest(ARRAY['1.0-5', '2.6-33', '3.34-50', '4.51-67', '5.68-83', '6.84-99', '7.100']) AS buaInterval
)

SELECT
  COALESCE(countBua, 0) AS countBua,
  ai.buaInterval
FROM
  AllIntervals ai
LEFT JOIN (
  SELECT
    COUNT(*) AS countBua,
    CASE
      WHEN bua_2021 BETWEEN 0 AND 5 THEN '1.0-5'
      WHEN bua_2021 BETWEEN 5 AND 33 THEN '2.6-33'
      WHEN bua_2021 BETWEEN 33 AND 50 THEN '3.34-50'
	    WHEN bua_2021 BETWEEN 50 AND 67 THEN '4.51-67'
	    WHEN bua_2021 BETWEEN 67 AND 83 THEN '5.68-83'
    	WHEN bua_2021 BETWEEN 83 AND 99.9 THEN '6.84-99'
	    WHEN bua_2021 = 100 THEN '7.100'
    END AS buaInterval
  FROM
    kp."buaGrid"
  WHERE
    nama_kabko = $1 AND bua_2022 IS NOT NULL
  GROUP BY
    buaInterval
) AS QueryResult
ON ai.buaInterval = QueryResult.buaInterval
ORDER BY
  ai.buaInterval;`;

const getCount2022 = `
WITH AllIntervals AS (
  SELECT
    unnest(ARRAY['1.0-5', '2.6-33', '3.34-50', '4.51-67', '5.68-83', '6.84-99', '7.100']) AS buaInterval
)

SELECT
  COALESCE(countBua, 0) AS countBua,
  ai.buaInterval
FROM
  AllIntervals ai
LEFT JOIN (
  SELECT
    COUNT(*) AS countBua,
    CASE
      WHEN bua_2022 BETWEEN 0 AND 5 THEN '1.0-5'
      WHEN bua_2022 BETWEEN 5 AND 33 THEN '2.6-33'
      WHEN bua_2022 BETWEEN 33 AND 50 THEN '3.34-50'
      WHEN bua_2022 BETWEEN 50 AND 67 THEN '4.51-67'
      WHEN bua_2022 BETWEEN 67 AND 83 THEN '5.68-83'
      WHEN bua_2022 BETWEEN 83 AND 99.9 THEN '6.84-99'
      WHEN bua_2022 = 100 THEN '7.100'
    END AS buaInterval
  FROM
    kp."buaGrid"
  WHERE
    nama_kabko = $1 AND bua_2022 IS NOT NULL
  GROUP BY
    buaInterval
) AS QueryResult
ON ai.buaInterval = QueryResult.buaInterval
ORDER BY
  ai.buaInterval;`;

module.exports = {
  getBoundaries,
  getBoundariesName,
  getChartData,
  getCount2018,
  getCount2019,
  getCount2020,
  getCount2021,
  getCount2022,
}


// `
// SELECT json_build_object(
//   'type',       'Feature',
//   'geometry',   ST_AsGeoJSON(geom)::json,
//   'properties', json_build_object(
//     'gid', gid,
//     'city', nama_kabko,
//     'population_2018', population_2018,
//     'population_2019', population_2019,
//     'population_2020', population_2020,
//     'population_2021', population_2021,
//     'population_2022', population_2022,
//     'bua_2018', bua_2018,
//     'bua_2019', bua_2019,
//     'bua_2020', bua_2020,
//     'bua_2021', bua_2021,
//     'bua_2022', bua_2022,
//     'area', area
//    )
// ) AS buaOutline
// FROM kp."buaData";`