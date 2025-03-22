-- Add indexes for search optimization
ALTER TABLE persons ADD INDEX idx_name (name);
ALTER TABLE persons ADD INDEX idx_address (address);
ALTER TABLE persons ADD INDEX idx_territory (territory); 