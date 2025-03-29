-- Add user_id column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id);

-- Update existing bookings to have a user_id (if needed)
-- You may need to adjust this based on your data
UPDATE bookings SET user_id = (SELECT id FROM users LIMIT 1) WHERE user_id IS NULL;

-- Make user_id required for future bookings
ALTER TABLE bookings ALTER COLUMN user_id SET NOT NULL;

-- Enable RLS on bookings table if not already enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Clients can view their own bookings" ON bookings
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'client'
    ) AND user_id = auth.uid()
  );

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Clients can create their own bookings" ON bookings
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'client'
    ) AND user_id = auth.uid()
  );

CREATE POLICY "Clients can delete their own bookings" ON bookings
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'client'
    ) AND user_id = auth.uid()
  );

CREATE POLICY "Admins can delete any booking" ON bookings
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  ); 