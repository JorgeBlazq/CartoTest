import { test, expect } from '@playwright/test';

test('Create table from query button disabled', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await expect(page2.getByText('Create table from query')).toBeDisabled();
});

test('Create table from query button available', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await page2.locator('textarea').fill('Select * from');
  await expect(page2.getByText('Create table from query')).toBeEnabled();
});

test('Current connection appears', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await expect(page2.locator('//*[@id="root"]/div[2]/div[3]/div/div[1]/div[3]/p')).not.toBeEmpty();
});

test('Geospatial support autoselects Geometry', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await page2.locator('textarea').fill('SELECT population, geometry as geom FROM demographic_data');
  await expect(page2.getByRole('tooltip', { name: 'The spatial data type has been automatically selected based on your query. Please review before running.' })).toBeVisible();
  await expect(page2.getByLabel('Geometry')).toBeVisible();
});

test('Geospatial support autoselects H3', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await page2.locator('textarea').fill('SELECT `carto-un`.carto.H3_FROMGEOGPOINT(geom, 10) as h3, count(*) as num_points FROM 10M_points_table GROUP BY h3');
  await expect(page2.getByRole('tooltip', { name: 'The spatial data type has been automatically selected based on your query. Please review before running.' })).toBeVisible();
  await expect(page2.getByLabel('H3')).toBeVisible();
});

test('Geospatial support autoselects Quadbins', async ({ page }) => {
  await page.goto('https://clausa.app.carto.com/');
  await page.getByLabel('Email address').fill('jorgeblazquezthejordilil@gmail.com');
  await page.getByLabel('Password').fill('testPassword123');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Maps' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New map' }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('open-add-source-button').click();
  await page2.getByText('Custom Query (SQL)').click();
  await page2.getByLabel('carto_dw').click();
  await page2.getByLabel('add-source-button', { exact: true }).click();
  await page2.locator('textarea').fill('SELECT `carto-un`.carto.QUADBIN_FROMGEOGPOINT(geom, 10) as quadbin, count(*) as num_points FROM 10M_points_table GROUP BY quadbin');
  await expect(page2.getByRole('tooltip', { name: 'The spatial data type has been automatically selected based on your query. Please review before running.' })).toBeVisible();
  await expect(page2.getByLabel('Quadbins')).toBeVisible();
});