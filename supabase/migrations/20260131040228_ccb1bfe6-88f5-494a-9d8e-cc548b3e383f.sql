-- Fix function search path for reference number generators and timestamp updater
CREATE OR REPLACE FUNCTION public.generate_inquiry_reference()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    today_count INTEGER;
    today_date TEXT;
BEGIN
    today_date := TO_CHAR(NOW(), 'YYYYMMDD');
    SELECT COUNT(*) + 1 INTO today_count 
    FROM public.inquiries 
    WHERE reference_number LIKE 'INQ-' || today_date || '-%';
    
    NEW.reference_number := 'INQ-' || today_date || '-' || LPAD(today_count::TEXT, 3, '0');
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_appointment_reference()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    today_count INTEGER;
    today_date TEXT;
BEGIN
    today_date := TO_CHAR(NOW(), 'YYYYMMDD');
    SELECT COUNT(*) + 1 INTO today_count 
    FROM public.appointments 
    WHERE reference_number LIKE 'APT-' || today_date || '-%';
    
    NEW.reference_number := 'APT-' || today_date || '-' || LPAD(today_count::TEXT, 3, '0');
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;